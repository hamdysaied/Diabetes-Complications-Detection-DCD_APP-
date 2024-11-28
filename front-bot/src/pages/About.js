import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

function About() {
  const [text, setText] = useState("");

  useEffect(() => {
    const paragraph =
      "We are a team of students from Faculty of Faculty of Computers and " +
      "Data Science Alexandria University, and this is our graduation project. " +
      "We are trying to help our society by providing this easy, cheap, and " +
      "fast tool to early detect the complications of diabetes and helping " +
      "the people to find the suitable way of treatment for their cases by " +
      "redirecting them to a suitable doctor for their cases. We used a " +
      "complicated machine learning models to do this task, these models " +
      "use a huge amount of data to train and test these models, we also " +
      "tested them in real-world samples to check their accuracy.";

    let currentIndex = 0;
    const interval = setInterval(() => {
      setText(paragraph.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > paragraph.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <section className="container mx-auto px-4 py-16 min-h-[calc(100vh-323px)] flex items-center justify-center border-t border-black">
        <div>
          <p className="font-roboto text-2xl max-w-5xl tracking-[0.02em] leading-9">
            {text}
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;
