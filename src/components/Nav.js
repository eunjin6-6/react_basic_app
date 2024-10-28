import React, { Component } from 'react'

export default class Nav extends Component {
  //렌더링 되기 전에 확인하기
  shouldComponentUpdate(newProps, newState){
    //첫번째 매개변수newProps - 변경된 속성값이 들어옴 newProps.data
    //이전값 this.props.data - 부모로부터 받은 값
    //변경사항이 없어도 기본값 true여서 업데이트, 즉 렌더 실행(뒤에거 실행)
    console.log(
      'shouldComponentUpdate 작동',
      newProps.data, //변경된 값
      this.props.data //이전값
    );
   
    if(newProps.data === this.props.data){//값이 같다면 > 변경된게 없다면
      return false; //업데이트 안함
    }else{
      return true; //변동사항 있으면 업데이트 함
    }

  }

  render() {
    console.log('Nav render'); //Nav 렌더 여부 확인
    let list = [];
    let data = this.props.data; //부모로받은 이전값, 원본
    data.forEach((item)=>{
      list.push(<li key={item.id}><a 
        //data-id={item.id-1}
        href="#"
        onClick={(e)=>{
          e.preventDefault();
          this.props.onChangePage(item.id); //이거 클릭했어요 전달
        }}
        >{item.title}</a></li>);
    })
    /*
    let i = 0;
    console.log(data[i].id-1);

    while(i<data.length){
      list.push(<li key={data[i].id}><a 
        data-id={data[i].id-1}
        href=""
        onClick={(e)=>{
          e.preventDefault();
          this.props.onChangePage(e.target.dataset.id);
        }}
        >{data[i].title}</a></li>);
      // i+=1;
      i++;
    }
    */
    return (
      <nav>
          <ul>
              {list}
          </ul>
      </nav>
    )
  }
}
