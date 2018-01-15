import React from 'react';
import PropTypes from 'prop-types';

const INPUT_STYLES = {
  background: '#e9eaec',
  border: 'none',
  padding: '8px 25px 8px 32px',
  boxShadow: 'none',
  height: '35px',
};

const CLOSED_INPUT = {
  width: '10px',
  padding: '8px 19px',
};

const CLOSED_STYLES = {
  ...INPUT_STYLES,
  ...CLOSED_INPUT,
};

const LABEL_STYLE = {
  position: 'relative',
  margin: '6px 0',
  float: 'right',
};

const ICON_STYLES = {
  position: 'absolute',
  top: '6px',
  left: '12px',
};

const OPEN_FORM_STYLES = {
  position: 'absolute',
  top: '-20px',
  bottom: '-20px',
  width: 'calc(100% - 30px)',
  height: 'calc(100% + 34px)',
  background: '#fff',
  padding: '20px 0',
  zIndex: '1',
};

const FORM_STYLES = {
  float: 'right',
};

const RADIO_STYLES = {
  margin: '0 .5em 0 0',
};

const RADIO_LABEL_STYLES = {
  padding: '12px 8px',
  fontSize: '12px',
};

const CROSS_STYLES = {
  position: 'absolute',
  top: '6px',
  right: '10px',
  cursor: 'pointer',
};

const RadioButton = ({
  label,
  value,
  checked,
  onChange,
}) => (
  <label style={RADIO_LABEL_STYLES} htmlFor={value}>
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      style={RADIO_STYLES}
      name={value}
    />
    {label}
  </label>
);

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default class Search extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    open: false,
    text: '',
    searchBy: 'authorName',
  };

  setRef = (ref) => {
    this._input = ref;
  }

  handleFocus = () => {
    this.setState({open: true});
  }

  handleBlur = () => {
    this._input.blur();
    this.setState({open: false});
  }

  handleOnChange = (e) => {
    const text = e.target.value;
    this.setState({text});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { searchBy, text } = this.state;
    this.handleBlur();
    this.props.onSubmit(searchBy, text);
  }

  handleSearchBy = (e) => {
    const searchBy = e.target.value;
    this.setState({searchBy});
  }

  isChecked(label) {
    return label === this.state.searchBy;
  }

  render() {
    const { open } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        style={open ? OPEN_FORM_STYLES : FORM_STYLES}
      >
        <label style={LABEL_STYLE} htmlFor="search">
          <i
            className="icon-budicon-489 icon"
            style={ICON_STYLES}
            onClick={this.handleFocus}
          />
          {open &&
            <i
              className="icon-budicon-471 icon"
              style={CROSS_STYLES}
              onClick={this.handleBlur}
            />
          }
          <input
            className="form-control"
            style={open ? INPUT_STYLES : CLOSED_STYLES}
            onChange={this.handleOnChange}
            onFocus={this.handleFocus}
            value={this.state.text}
            name="search"
            placeholder="Search here..."
            ref={this.setRef}
          />
        </label>
        { open &&
          <div>
            <RadioButton
              label="Text"
              value="text"
              checked={this.isChecked('text')}
              onChange={this.handleSearchBy}
            />
            <RadioButton
              label="Author"
              value="authorName"
              checked={this.isChecked('authorName')}
              onChange={this.handleSearchBy}
            />
          </div>
        }
      </form>
    );
  }
}
