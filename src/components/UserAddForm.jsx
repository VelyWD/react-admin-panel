import React from 'react';
import './UserAddForm.css';
class UserAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            isGoldClient: false,
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F152-1520367_user-profile-default-image-png-clipart-png-download.png&f=1&nofb=1&ipt=5dc48826da5645ef6e36453a0ffe3280db8016f6bedbcd762697d4ee4b667162&ipo=images',
            salary: ''
        };
    }

    randomiseSalary() {
        this.setState({salary: '$' + Math.floor(Math.random() * 6500 + 1000)});
    }

    componentDidMount() {
        this.randomiseSalary();
    }

    updateName(event) {
        this.setState({name: event.target.value});
    }

    updateEmail(event) {
        this.setState({email: event.target.value});
    }

    updateIsGoldClient(event) {
        this.setState({isGoldClient: event.target.checked});
    }

    updateImage(event) {
        this.setState({image: event.target.value});
    }

    render() {
        const {name, email, isGoldClient, salary, image} = this.state;

        return (
            <form
                className="user-add-form"
                onSubmit={(event) => {
                    this.props.submitAddForm(event, name, email, isGoldClient, salary, image);
                    this.randomiseSalary();
                }}
            >
                <h2>Adauga utilizatori:</h2>
                <label htmlFor="name">Nume:</label>
                <input
                    type="text"
                    name="name"
                    onChange={(event) => this.updateName(event)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    onChange={(event) => this.updateEmail(event)}
                />
                <label htmlFor="image">{"Poza de profil (URL)"}:</label>
                <input
                    type="text"
                    name="image"
                    onChange={(event) => this.updateImage(event)}
                />
                <label htmlFor="is-gold-client">Client GOLD?</label>
                <input
                    type="checkbox"
                    name="is-gold-client"
                    value="true"
                    onChange={(event) => this.updateIsGoldClient(event)}
                    id="gold-client-chk"
                />

                <input type="submit" value="Introdu utilizatorul"/>
            </form>
        )
    }
}

export default UserAddForm;