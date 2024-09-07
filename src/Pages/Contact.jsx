import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Fox from "../Models/Fox"

import  Loader from "../Components/Loader";
import useAlert from "../hooks/useAlert";
import Alert from "../Components/Alert";

const Contact = () => {
  const [currentAnimation,setCurrentAnimation]=useState('idle');
  const formRef = useRef();
  const [form, setForm] = useState({ name: " ", email: " ", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const {alert,showAlert ,hideAlert}=useAlert();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
  
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit')
    emailjs
      .send(
        
        'service_mddufi8','template_ajsrx5s',
        {
          from_name: form.name,
          to_name: "Dhruv",
          from_email: form.email,
          to_email: "sharmadhruv1303@gmail.com",
          message: form.message,
        },
        
        'Pv9FC9YHkyO782s1F',
      )
      .then(() => {
        setIsLoading(false);
       
        setTimeout(()=>{
          hideAlert();
          setCurrentAnimation('idle')
          setForm({ name: " ", email: " ", message: "" });
          showAlert({ show: true,
            text: "Thank you for your message 😃",
            type: "success"})
        
        },[3000])
        
      })
      .catch((error) => {
        setIsLoading(false);
        setCurrentAnimation('idle')
        showAlert({show:false,text: 'I didnt get your message',type:"Danger"})
        console.log(error);
      });
  };
  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert }/>}
      
      <div className="flex-1 min-w-[50%] flex flex-col ">
        <h1 className="head-text"> Get in Touch</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-7 mt-14"
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="John@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              rows={4}
              className="textarea"
              placeholder="Let me know how I can help you!"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? "Sending...." : "Send Message"}
          </button>
        </form>
      </div>
      <div className="lg w-1/2 w-full  lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
        camera={{
          position:[0,0,5],
          fov:75,
          near:0.1,
          far:1000
        }}
        >
          <directionalLight intensity={2.5} position={[0,0,1]}/>
          <ambientLight intensity={0.5}/>
          <Suspense fallback={<Loader/>}>
            <Fox
            currentAnimation={currentAnimation}
            position={[0.5,0.35,0]}
            rotation={[12.6,-0.6,0]}
            scale={[0.5,0.5,0.5]}
            />

          </Suspense>
        </Canvas>
      </div>
     
    </section>
  );
};

export default Contact;
