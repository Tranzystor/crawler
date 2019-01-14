import React, { Component } from 'react';
import './App.css';
import { Layout, Collapse } from 'antd';
import Header from './components/Header';
import TvDetails from './components/TvDetails';

const {
  Content,
} = Layout;

const Panel = Collapse.Panel;

class App extends Component {

  state = {
    tvs: [],
    actives: []
  }

  componentDidMount = () => {
    this.getData();
  }

  getData = () => {
    fetch("/tvs/all", { method: "GET" }).then(result => {
      return result.json();
    }).then(tvs => {
      this.setState({tvs});
    })
  }

  onChange = actives => {
    this.setState({actives});
  }

  renderTvs = () => {
    return (
      <Collapse onChange={this.onChange}>
        {
          this.state.tvs.map(tv => {
            const isActive = this.state.actives.includes(tv.model);
            return (
              <Panel key={tv.model} header={<Header tv={tv} />} >
                  <TvDetails model={tv.model} isActive={isActive} />
              </Panel>
            )
          })
        }
      </Collapse>
    )
  }

  render() {
    return (
      <Layout>
        <Content>
          {this.renderTvs()}
        </Content>
      </Layout>
    );
  }
}

export default App;
