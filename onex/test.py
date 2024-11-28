import os
from skimage import io, transform
from skimage.metrics import structural_similarity as ssim
import numpy as np
from PIL import Image
from flask import Flask, jsonify, request
import onnxruntime as rt
from flask_pymongo import PyMongo
from bson import json_util, ObjectId

app = Flask(__name__)

app.config[
    "MONGO_URI"] = "mongodb+srv://mheba509:v3962W1QD3eHK6zt@cluster0.9thadgh.mongodb.net/DCD?retryWrites=true&w=majority"
mongo = PyMongo(app)

# Load the ONNX model
sess = rt.InferenceSession("model10.onnx")
sesss = rt.InferenceSession("DFUmodel.onnx")
# Define the input and output names for the model
input_name = sess.get_inputs()[0].name
output_name = sess.get_outputs()[0].name
input_name2 = sesss.get_inputs()[0].name
output_name2 = sesss.get_outputs()[0].name


def compare_images(image_path, folder_path, target_size=(512, 512), threshold=0.5):
    # Load the reference image and resize it
    reference_image = io.imread(image_path, as_gray=True)
    reference_image = transform.resize(reference_image, target_size)

    max_score = 0.0

    # Iterate through images in the folder
    for filename in os.listdir(folder_path):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            # Load the image from the folder and resize it
            image = io.imread(os.path.join(folder_path, filename), as_gray=True)
            image = transform.resize(image, target_size)

            # Calculate the SSIM score between the reference image and the current image
            score = ssim(reference_image, image)

            # Update the maximum similarity score
            if score > max_score:
                max_score = score

    # Print the overall similarity status
    if max_score >= threshold:
        return True
    else:
        return False


def load_model(file):
    # open the image
    file = Image.open(file)

    # Resize the image
    img = file.resize((512, 512))
    # normalization of image
    img = img / np.max(img)

    # Convert the image to a numpy array
    input_data = np.array(img).astype(np.float32)

    # Transpose the input tensor to match the expected shape of the model
    input_data = np.transpose(input_data, (2, 0, 1))
    input_data = np.expand_dims(input_data, axis=0)

    # Run inference on the input data
    output_data = sesss.run([output_name2], {input_name2: input_data})

    # Convert the output data to a JSON object and return it
    result = {'result': output_data[0].tolist()}

    if result['result'][0][1] < 0:
        return "DFU Detected "
    else:
        return "Normal"


def test_model(file):
    # open the image
    file = Image.open(file)

    # Resize the image
    img = file.resize((512, 512))
    # normalization of image
    img = img / np.max(img)

    # Convert the image to a numpy array
    input_data = np.array(img).astype(np.float32)

    # Transpose the input tensor to match the expected shape of the model
    input_data = np.transpose(input_data, (2, 0, 1))
    input_data = np.expand_dims(input_data, axis=0)

    # Run inference on the input data
    output_data = sess.run([output_name], {input_name: input_data})

    # Convert the output data to a JSON object and return it
    result = {'result': output_data[0].tolist()}

    if result['result'][0][1] > 0:
        return "Diabetic Retinopathy Detected"
    else:
        return "Normal"


@app.route('/')
def home():
    return 'Server works'


@app.route('/patients', methods=['GET'])
def get_all_users():
    patients = mongo.db.patients.find({})
    patients_json = json_util.dumps(patients)
    return patients_json

@app.route('/patient/<nationalID>', methods=['GET'])
def get_user(nationalID):
    patient = mongo.db.patients.find_one({'nationalID': nationalID})
    if patient:
        patient_json = json_util.dumps(patient)
        return patient_json
    else:
        return 'User not found', 404



@app.route('/image/<patient_id>', methods=['PUT'])
def image(patient_id):
    file = request.files['file']
    patient = mongo.db.patients.find_one({'_id': ObjectId(patient_id)})
    folder_path = "data_ret"
    file.save('uploads/' + file.filename)
    path = 'uploads/' + file.filename
    similarity = compare_images(path, folder_path)

    if similarity:
        result = test_model(path)
        data = {'retina_image_path': path, 'retina_ulcer_diagnosis': result}
        patient.update(data)
        mongo.db.patients.replace_one({'_id': ObjectId(patient_id)}, patient)
        return {
            "message": 'File uploaded successfully',
            "result": result,
            "user": patient_id
        }
    else:
        return {"message": 'Entry error.'}, 400


@app.route('/predict/<patient_id>', methods=['PUT'])
def predict(patient_id):
    file = request.files['file']
    patient = mongo.db.patients.find_one({'_id': ObjectId(patient_id)})
    folder_path = "data"
    file.save('uploads_dfu/' + file.filename)
    path = 'uploads_dfu/' + file.filename
    similarity = compare_images(path, folder_path)
    if similarity:
        result = load_model(path)
        data = {'foot_image_path': path, 'foot_ulcer_diagnosis': result}
        patient.update(data)
        mongo.db.patients.replace_one({'_id': ObjectId(patient_id)}, patient)
        return {
            "message": 'File uploaded successfully',
            "result": result,
            "user": patient_id
        }
    else:
        return {
            "message": 'Entry error.',
        }, 400


if __name__ == '__main__':
    app.run(debug=True, port=5500)
