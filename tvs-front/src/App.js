import React, { Component } from 'react';
import './App.css';
import { Layout, Card, Badge, Collapse } from 'antd';
import { groupBy, filter, orderBy, flow } from 'lodash/fp';

const {
  Content,
} = Layout;

const Panel = Collapse.Panel;

class App extends Component {

  state = {
    tvs: []
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

  renderTvs = () => {
    return (
      <Collapse>
        {
          this.state.tvs.map((tv, i) => {
            const diagonal = tv.elements ? `${tv.elements[0].diagonal} [cal]`  : null;
            const cardTitle = `${tv.model} ${diagonal}`;
            const groupedByTime = groupBy('date')(tv.elements); 
            return (
              <Panel key={i} header={cardTitle} >
                {Object.entries(groupedByTime).map(([time, values], dateIndex) => {
                  return (
                    <div key={`date_${dateIndex}`} className="panel-content">
                      <span style={{fontWeight: 'bold', paddingRight: "15px"}}>{new Date(time).toLocaleDateString()}</span>
                      <span className="prices-list">
                        {
                          flow([
                              filter({ isProductAvailable: true }),
                              orderBy('price', 'asc'),
                            ])(values)
                          .map((value, i) => { 
                            const firstChildStyle = i === 0 ? { fontWeight: "bold" } : {};
                            const badgeContent = value.source === "ALLEGRO" ? "A" : "E";
                            const badgeBackground = value.source === "ALLEGRO" ? "#ff5d04" : "#ffed03";
                            return (
                                <span key={`price_${i}`} style={{padding: '5px', ...firstChildStyle }}>
                                  <span style={{paddingRight: '3px', color: "#468100"}}>{value.price}PLN</span>
                                  <Badge count={badgeContent} style={{backgroundColor: badgeBackground}}></Badge>
                                </span>
                              )
                            })
                        }
                      </span>
                    </div>
                  )
                })}
            </Panel>
            )
          })
        }
      </Collapse>
    )
  }

  renderTvs_ = () => {

    return this.state.tvs.map((tv, i) => {
      const diagonal = tv.elements ? `${tv.elements[0].diagonal} [cal]`  : null;
      const cardTitle = `${tv.model} ${diagonal}`;
      const groupedByTime = groupBy('date')(tv.elements);
      return (
        <Card key={i} title={cardTitle}>
          <div>{Object.entries(groupedByTime).map(([time, values]) => {
            return (
              <div key={i}>
                {new Date(time).toLocaleDateString()}
                {values.map(value => <div>{value.price}</div>)}
              </div>
            )
          })}</div>
        </Card>
      )
    });
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
