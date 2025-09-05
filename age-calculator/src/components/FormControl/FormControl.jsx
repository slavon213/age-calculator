import styles from "./FormControl.module.css";

const FormControl = ({id, label, placeholder, min, max}) => {
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
