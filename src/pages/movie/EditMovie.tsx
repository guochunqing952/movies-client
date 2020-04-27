import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

interface IParams {
  id: string;
}

export default class EditMovie extends Component<RouteComponentProps<IParams>> {
  render() {
    return (
      <div>
        <h1>修改电影页{this.props.match.params.id}</h1>
      </div>
    );
  }
}
