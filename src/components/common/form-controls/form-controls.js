import React from "react";
import s from './form-control.module.css';

const FormControl = ({meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (<div className={s.formControl + " " + (hasError ? s.error : "")}>
        {props.children}
        {hasError && <span>{meta.error}</span>}
    </div>);
}

export const FormControls = (props) => {
    const {meta, input, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>);
}

export const Input = (props) => {
    const {meta, input, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>);
}
