import React, { useState, useEffect } from 'react';
import EmployeeService from '../service/EmployeeService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddEmployeeComponent = () => {
    /** Variables and method to collect and store inputs */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const employeeData = { firstName, lastName, email }; // Bundle the input from user

    /** Send data to API and navigate when successful */
    function saveEmployee(e) {
        e.preventDefault();

        if (employeeData.firstName !== "" && employeeData.lastName !== "" && employeeData.email !== "") {  // Fixed '!=='
            /** If id is present in the parameter, it should update else it should save */
            if (id) {
                EmployeeService.updateEmployee(id, employeeData)
                    .then(() => navigate("/employee"))  // Corrected promise handling
                    .catch(e => console.log(e));
            } else {
                EmployeeService.saveEmployee(employeeData)
                    .then(() => navigate("/employee"))  // Corrected promise handling
                    .catch(e => console.log(e));
            }
        } else {
            alert("Please, fill in all inputs");
        }
    }

    function title() {
        return id ? "Update Employee" : "Add Employee";
    }

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then(res => {
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setEmail(res.data.email);
                })
                .catch(e => console.log(e));
        }
    }, [id]);  // Added 'id' to dependency array

    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h2 className='text-center'>{title()}</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text" placeholder='Enter First Name' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text" placeholder='Enter Last Name' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" placeholder='Enter Email' />
                                </div>
                                <button onClick={(e) => saveEmployee(e)} className='btn btn-success'>Save</button> {" "}
                                <Link to={"/employee"} className='btn btn-danger'>Cancel</Link> {/* Removed href */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeComponent;

