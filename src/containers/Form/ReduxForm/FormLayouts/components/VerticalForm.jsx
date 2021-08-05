import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import EyeIcon from 'mdi-react/EyeIcon';
import renderCheckBoxField from '@/shared/components/form/CheckBox';

const VerticalForm = ({ handleSubmit, reset }) => {
  const { t } = useTranslation('common');
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const showPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <Col xs={12} md={12} lg={12} xl={6}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">{t('forms.form_layouts.vertical_form')}</h5>
            <h5 className="subhead">Labels are above fields</h5>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__form-group">
              <span className="form__form-group-label">Username</span>
              <div className="form__form-group-field">
                <Field
                  name="username"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">E-mail</span>
              <div className="form__form-group-field">
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder="example@mail.com"
                />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Url</span>
              <div className="form__form-group-field">
                <Field
                  name="url"
                  component="input"
                  type="url"
                  placeholder="https://themeforest.net"
                />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Password</span>
              <div className="form__form-group-field">
                <Field
                  name="password"
                  component="input"
                  type={isPasswordShown ? 'text' : 'password'}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className={`form__form-group-button${isPasswordShown ? ' active' : ''}`}
                  onClick={() => showPassword()}
                ><EyeIcon />
                </button>
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="remember_me_vertical"
                  component={renderCheckBoxField}
                  label="Remember me"
                />
              </div>
            </div>
            <ButtonToolbar className="form__button-toolbar">
              <Button color="primary" type="submit">Submit</Button>
              <Button type="button" onClick={reset}>
                Cancel
              </Button>
            </ButtonToolbar>
          </form>
        </CardBody>
      </Card>
    </Col>
  );
};

VerticalForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'vertical_form_layout', // a unique identifier for this form
})(VerticalForm);
