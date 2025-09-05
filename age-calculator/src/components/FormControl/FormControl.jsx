import { useState } from "react";
import styles from "./FormControl.module.css";

const FormControl = ({id, label, placeholder, min, max, onChange}) => {
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        onChange(value);
        setErrors();
    }

    return (
        <div className={styles.formControl}>
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                name={id}
                id={id}
                placeholder={placeholder}
                inputmode="numeric"
                min={min}
                {... (max && {max}) }
            />
            <small></small>
        </div>
    );
};

export default FormControl;
