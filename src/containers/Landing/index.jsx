import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Container } from 'reactstrap';
import { Link, Element } from 'react-scroll';
import { changeThemeToDark, changeThemeToLight } from '@/redux/actions/themeActions';
import { ThemeProps } from '@/shared/prop-types/ReducerProps';
import store from '../App/store';
import ActiveUsers from '../Dashboards/App/components/ActiveUsers';
import VisitorsSessions from '../Dashboards/OnLineMarketing/components/VisitorsSessions';
import CurrentUsers from '../Dashboards/App/components/CurrentUsers';
import PageViewsShort from '../Dashboards/App/components/PageViewsShort';
import SessionShort from '../Dashboards/App/components/SessionShort';

const logo = `${process.env.PUBLIC_URL}/img/landing/logo.svg`;

const Landing = ({ dispatch, theme }) => {
  const users = store.getState().newOrder.items;
  return (
    <Container className="dashboard">

      <Row>
        <VisitorsSessions usersNew={users} />
        <PageViewsShort />
        <SessionShort />
      </Row>
      <Row>
        <ActiveUsers />
        <CurrentUsers />
      </Row>

    </Container>
  );
};

Landing.propTypes = {
  dispatch: PropTypes.func.isRequired,
  theme: ThemeProps.isRequired,
};

export default connect(state => ({ theme: state.theme }))(Landing);
