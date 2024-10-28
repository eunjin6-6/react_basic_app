import React, { Component } from 'react'

export default class Myheader extends Component {
  shouldComponentUpdate(){//바뀌는값 아니여서 비교할 값 없음
  return false; //업데이트 안함
}


  render() {
    console.log('Myheader render');
    return (
      <header>
        <h1 className="logo" onClick={()=>{
          this.props.onChangePage();
        }}>{this.props.title}</h1>
        <p>{this.props.desc}</p>
      </header>
    )
  }
}
