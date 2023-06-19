import React, { Component, Fragment } from "react";
import Select, { components } from "react-select";

const customSelectStyles = {
    control: styles => ({ ...styles, width: '100%', minHeight: 31, }),
    container: styles => ({ ...styles, minHeight: 31, width: '100%', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important' }),
    dropdownIndicator: styles => ({ ...styles, padding: 4, }),
    indicatorSeparator: styles => ({ ...styles, marginTop: 4 }),
    menu: styles => ({ ...styles, padding: 0, marginBottom: 1 }),
    valueContainer: base => ({ ...base, paddingLeft: 25, bbackgroundColor: '#e9ecef' }),
    clearIndicator: styles => ({ ...styles, padding: 4 }),
}

const ValueContainer = ({ children, ...props }) => {
    
    return (
        components.ValueContainer && (
            <components.ValueContainer {...props}>
                {!!children && (
                    <i
                        className={props.selectProps.icon ? props.selectProps.icon : ''}
                        aria-hidden="true"
                        style={{ position: "absolute", left: 6 }}
                    />
                )}
                {children}
            </components.ValueContainer>
        )
    );
};

const styles = {
    valueContainer: base => ({
        ...base,
        paddingLeft: 28
    })
}


export default class CustomSelect extends Component {
    
    state = {
        value: this.props.value || ""
    };

    selectRef = null;
    setSelectRef = ref => {
        this.selectRef = ref;
    };

    onChange = (value, actionMeta) => {
        this.props.onChange(value, actionMeta);
        this.setState({ value });
    };

    getValue = () => {
        if (this.props.value !== undefined) return this.props.value;
        return this.state.value || "";
    };

    clear() {
        this.setInputValue('');
    }


    render() {
        const { SelectComponent, required, ...props } = this.props;
        const { isDisabled } = this.props;
        const enableRequired = !isDisabled;
        const components = { ValueContainer };
        
        return (

            <Fragment>
                <Select 
                    {...props}
                    ref={this.setSelectRef}
                    onChange={this.onChange}
                    components={components}
                    styles={props.icon ? styles : ''}                
                />
                {enableRequired && (
                    <input
                        tabIndex={-1}
                        autoComplete="off"
                        style={{
                            visibility: "hidden",
                            width: "100%",
                            height: 0,
                            position: "absolute"
                        }}
                        className="unplesantInput"
                        value={this.getValue()}
                        onChange={() => { }}
                        onFocus={() => this.selectRef.focus()}
                        required={required}
                    />
                )}
            </Fragment>
        
        );
    }
}