import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card, CardBody, Col, Progress,
} from 'reactstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';

const ActiveUsersShort = (users) => {
  const { usersNew } = users;
  // const quantityTotal = usersNew.map(item => item.quantity).reduce((prev, next) => prev + next);
  console.log(usersNew);

  return (
    <Col md={12} xl={4} lg={6} xs={12}>
      <Card>
        <CardBody className="dashboard__card-widget">
          <div className="mobile-app-widget">
            <div className="mobile-app-widget__top-line mobile-app-widget__top-line--lime">
              <p className="mobile-app-widget__total-stat">123</p>
              <TrendingUpIcon className="dashboard__trend-icon" />
            </div>
            <div className="mobile-app-widget__title">
              <h5>To</h5>
            </div>
            <div className="progress-wrap progress-wrap--small progress-wrap--lime-gradient progress-wrap--label-top">
              <Progress value={32}><p className="progress__label">23%</p></Progress>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActiveUsersShort;
