import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => 
    {
        console.log('form submitted', data)
    };
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        {/* <input name="example" defaultValue="test" ref={register} /> */}
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your name"/>
        {errors.name && <span className="error">Name is required</span>}
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email"/>
        {errors.email && <span className="error">Email is required</span>}
        <input name="address" ref={register({ required: true })} placeholder='Your address'/>
        {errors.address && <span className="error">Address is required</span>}
        <input name="phoneNumber" ref={register({ required: true })} placeholder="Your phone number"/>
        {errors.phoneNumber && <span className="error">Phone Number is required</span>}
        <input type="submit" />
      </form>
    );
};

export default Shipment;