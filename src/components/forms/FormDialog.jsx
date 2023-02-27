import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from './TextInput'

export default class FormDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            description: ""
        }

        this.inputName = this.inputName.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputDescription = this.inputDescription.bind(this);

    }

    inputName = (event) => {
        this.setState({ name: event.target.value })
    }
    inputEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    inputDescription = (event) => {
        this.setState({ description: event.target.value })
    }
    submitForm = () => {
        const name = this.state.name;
        const email = this.state.email;
        const description = this.state.description;

        const payload = {
            text: 'お問い合わせがありました\n' +
                'お名前' + name + '\n' +
                'Email' + email + '\n' +
                '問い合わせ内容' + description
        }

        const url = 'https://hooks.slack.com/services/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';

        fetch(url, {
            method: 'post',
            body: JSON.stringify(payload)
        }).then(() => {
            alert('送信が完了しました。追ってご連絡します')
            this.setState({
                name: "",
                email: "",
                description: ""
            })
            return this.props.handleClose()
        })
    }


    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <TextInput
                        label={"お名前(必須)"} multiline={false} rows={1}
                        value={this.state.name} type={"text"} onChange={this.inputName}
                    />
                    <TextInput
                        label={"メールアドレス(必須)"} multiline={false} rows={1}
                        value={this.state.email} type={"text"} onChange={this.inputEmail}
                    />

                    <TextInput
                        label={"お問い合わせ内容(必須)"} multiline={true} rows={1}
                        value={this.state.description} type={"text"} onChange={this.inputDescription}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose}>キャンセル</Button>
                    <Button onClick={this.submitForm} autoFocus>送信する</Button>
                </DialogActions>
            </Dialog >
        )
    }
}