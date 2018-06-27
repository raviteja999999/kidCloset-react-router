import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// Not using air-bnb dates anymore. Using - https://hacker0x01.github.io/react-datepicker/

export default class QuizForm extends React.Component {
  constructor(props) {
    // Take the default values from the store. 
    super(props);
    this.state = { 
        name: '',
        daughter_name: '',
        birthday: moment(),
        calendarFocused: false
    };

    this.nameChange = this.nameChange.bind(this);
    this.daughterNameChange = this.daughterNameChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nameChange(event) {
    this.setState({ name: event.target.value });
  }

  daughterNameChange(event) {
    this.setState({ daughter_name: event.target.value });
  }

  onDateChange(event) {
    this.setState({ birthday: event.target.value });
  }

  onFocusChange = (date) => {
    this.setState({
        startDate: date
      });
  };

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.nameChange} />
        </label>
        <label>
            Your little princess: 
            <input type="text" value={this.state.value} onChange={this.daughterNameChange} /> 
        </label>
        <label>
            birthday:
            <DatePicker
                selected={this.state.birthday}
                onChange={this.handleChange}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
            />
        </label>
        <input type="submit" value="Next" />
      </form>
    );
  }
}