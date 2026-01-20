import styles from './InputField.module.css';

interface InputFieldProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
  name?: string;
  id?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  className?: string;
}

function InputField({ 
  type = 'text', 
  name, 
  id,
  placeholder, 
  value, 
  onChange, 
  required = false,
  min,
  className = ''
}: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      className={`${styles.input} ${className}`}
    />
  );
}

export default InputField;
