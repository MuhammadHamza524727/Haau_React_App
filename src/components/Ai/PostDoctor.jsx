import { FaArrowCircleRight } from "react-icons/fa";
import BlurText from "../../blocks/TextAnimations/BlurText/BlurText";
import ShinyText from '../../blocks/TextAnimations/ShinyText/ShinyText';


export default function PostDoctor() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-semibold flex">
                    {/* <span className="text-blue-500 tracking-widest">C O D E</span>
                    <span className="ml-2 text-white">Doctor</span> */}
                    <BlurText
                        text="POST "
                        delay={150}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={PostDoctor}
                        className="text-blue-500 tracking-widest"
                    />
                     <BlurText
                        text="DOCTOR "
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={PostDoctor}
                        className="ml-2 text-white"
                    />
                </h1>
             
                {/* <p className="mt-2 text-sm   md:text-base tracking-[5px] font-stretch-expanded">Code Debug Conquer</p> */}
            
<ShinyText text="Post Emotions Conquer" disabled={false} speed={3} className='custom-class mt-2 text-sm   md:text-base tracking-[5px] font-stretch-expanded' />

            </div>

            <div className="mt-10 w-full max-w-md">
                <div className="bg-white rounded-lg p-4 flex items-center shadow-md">
                    <input
                        type="text"
                        placeholder="write your Post here..."
                        className="flex-grow p-2 text-sm text-black outline-none"
                    />
                    <button className="ml-2 text-blue-500 text-2xl">
                        <FaArrowCircleRight />
                    </button>
                </div>
                <div className="text-center mt-1 text-xs text-white"></div>
            </div>
        </div>
    );
}
