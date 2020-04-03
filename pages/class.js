import React, { Component } from "react";
import style, { isPadQueryString, loadingStyle } from "./index.style";
import { displayKeys } from "./index";

export default class Class extends Component {
  state = {
    data: [],
    isMobile: false
  };

  componentDidMount() {
    this.fetchData();
    this.mq = window.matchMedia(isPadQueryString);
    this.mq.addListener(this.mqChange);
    this.mqChange(this.mq);
  }

  componentWillUnmount() {
    if (this.mq) {
      this.mq.removeListener(this.mqChange);
    }
  }

  fetchData = () => {
    fetch("https://financialmodelingprep.com/api/v3/quote/AAPL,FB,GOOGL,AMZN")
      .then(res => res.json())
      .then(res => {
        if (res && res.length > 0) {
          this.setState({
            data: res
          });
        }
      });
  };

  mqChange = mq => {
    this.setState({ isMobile: mq.matches });
  };

  render() {
    const { data, isMobile } = this.state;

    if (data.length === 0) {
      return (
        <div>
          Loading...
          <style jsx>{loadingStyle}</style>
        </div>
      );
    }

    return (
      <div className="wrapper">
        {isMobile ? (
          data.map(item => (
            <div key={item.symbol} className="card">
              <span>{item.symbol}</span>
              <h3>{item.name}</h3>
              <p>
                <span>Price: {item.price}</span>
                <span>Change: {item.change}</span>
                <span>Volume: {item.volume}</span>
                <span>DayLow: {item.dayLow}</span>
                <span>DayHigh {item.dayHigh}</span>
              </p>
            </div>
          ))
        ) : (
          <table>
            <thead>
              <tr>
                {displayKeys.map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.symbol}>
                  {displayKeys.map(key => (
                    <td key={key}>{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <style jsx>{style}</style>
      </div>
    );
  }
}
