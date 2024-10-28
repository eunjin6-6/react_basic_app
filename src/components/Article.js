import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';


export default class Article extends Component {
  render() {
    console.log('Article render');
    let classNames = "";
    if(this.props.mode === 'welcome'){
      classNames = "visually-hidden";
    }

    return (
      <section>
          <article>
            <h2>{this.props.data.title}</h2>
            <p>{this.props.data.desc}</p>
            <p>난이도: {this.props.data.difficulty}</p>
            <div className={classNames}>
              <hr/>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" size="sm" onClick={(e)=>{
                  e.preventDefault();
                  this.props.onChangePage('modify'); //이거 클릭했어요 전달
                }}>Modify</Button>
                <Button variant="danger" size="sm" onClick={(e)=>{
                  e.preventDefault();
                  this.props.onChangePage('delete'); //이거 클릭했어요 전달
                }}>Delete</Button>
              </div>
            </div>
          </article>
      </section> 
    )
  }
}
