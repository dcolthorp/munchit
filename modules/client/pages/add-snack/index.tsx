import * as React from "react";
import { AddSnackUI, AddSnackUIProps, AddSnackFields } from "./add-snack-ui";
import { withApollo } from "react-apollo";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ApolloClient } from "apollo-client";
import { addSnackMutation } from "client/graphql-mutations/add-snack-mutation";

export interface ConnectedProps {
  client: ApolloClient;
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  props: ConnectedProps
): {} {
  return {
    onSubmit(form: CompletedForm) {
      addSnackMutation(props.client, form);
    }
  };
}

type CompletedForm = { [k in AddSnackFields]: string };
type FormState = { form: { [k in AddSnackFields]?: string } };
type FormProps = { onSubmit: (form: CompletedForm) => void };
class ManagedForm extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super();
    this.state = { form: {} };
  }

  update = (name: AddSnackFields, value: string) => {
    this.setState({ form: { ...this.state.form, [name]: value } });
  };

  onSubmit = () => {
    const vals = this.state.form as any;
    const ready = Object.values(AddSnackFields).every(x => vals[x]);
    if (ready) {
      this.props.onSubmit(this.state.form as CompletedForm);
      this.setState({ form: {} });
    } else {
      alert("Finish the form");
    }
  };

  render() {
    const { form } = this.state;
    console.log(form);
    const uiProps: AddSnackUIProps = {
      onSave: this.onSubmit,
      onFieldChanged: this.update,
      fields: {
        name: form.name || ""
      }
    };
    return <AddSnackUI {...uiProps} />;
  }
}

const connected = connect(undefined, mapDispatchToProps);

export const AddSnackPage = withApollo(connected(ManagedForm));
