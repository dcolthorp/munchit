import * as React from "react";

require("./styles.scss");

export enum AddSnackFields {
  NAME = "name"
}

export interface AddSnackUIProps {
  fields: { [key in AddSnackFields]: string };
  onFieldChanged: (field: AddSnackFields, value: string) => void;
  onSave: () => void;
}
export function AddSnackUI(props: AddSnackUIProps) {
  const { onSave, onFieldChanged, fields } = props;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onFieldChanged(e.target.name as AddSnackFields, e.target.value);

  return (
    <div className="add-snack-page">
      <h2>Add Snack</h2>

      <fieldset className="add-snack-page-fields">
        <label htmlFor="name">Name</label>
        <input
          name={AddSnackFields.NAME}
          type="text"
          value={fields.name}
          onChange={changeHandler}
        />
      </fieldset>

      <button onClick={onSave}>Save</button>
    </div>
  );
}
