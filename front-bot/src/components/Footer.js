import twitter from "../assets/twitter-sign 1.png";
import facebook from "../assets/facebook 1.png";
import gmail from "../assets/Gmail_icon.svg";

function Footer() {
  return (
    <section className="bg-[#4E545B] flex items-start justify-center py-12">
      <div className="text-center">
        <h2 className="font-lora font-bold text-xl text-white ">Contact Us</h2>
        <div className="w-[400px] h-[2px] bg-black my-3"></div>
        <div className="flex items-center justify-center gap-10">
          
          <div className="w-10">
            <a href="mailto:dcdgraduationproject@gmail.com">
              <img src={gmail} alt="gmail" className="w-full" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
export default Footer;
