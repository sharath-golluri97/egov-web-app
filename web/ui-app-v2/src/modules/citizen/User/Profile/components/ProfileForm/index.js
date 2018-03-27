import React from "react";
import { Button, TextField } from "../../../../../../components";
import CityPicker from "../../../../../common/CityPicker";

const ProfileForm = ({ formKey, form, onChange, navigateToLogin, submitForm }) => {
  const fields = form.fields || {};

  return (
    <div>
      <form className="profileFormContainer">
        <TextField {...fields.name} onChange={(e, value) => onChange(formKey, "name", value)} />
        <CityPicker onChange={onChange} formKey={formKey} fieldKey="city" field={fields.city} />
        <TextField {...fields.email} onChange={(e, value) => onChange(formKey, "email", value)} />
      </form>
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 profileBtnWrapper">
        <Button className="profileBtn" id="profile-save-action" primary={true} label="SAVE" fullWidth={true} onClick={() => submitForm(formKey)} />
      </div>
    </div>
  );
};

export default ProfileForm;