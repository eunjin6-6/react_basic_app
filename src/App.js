import './App.css';
import Myheader from './components/Myheader';
import Nav from './components/Nav';
import Article from './components/Article';
import CreateArticle from './components/createArticle';
import UpdateArticle from './components/UpdateArticle';
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_menu_id = 3;
    this.state = {
      mode:'welcome',
      selected_id: 0,
      subject:{title :'React',desc:'Single page Application'},
      welcome:{title :'Welcome',desc:'Welcome to React'},
      menus:[
        {id:1, title:'HTML', desc:'Hypertext Markup Language'},
        {id:2, title:'CSS', desc:'CSS for design'},
        {id:3, title:'Javascript', desc:'Javascript for interaction'},
        {id:4, title:'React', desc:'Single page Application'}
      ]
    };
  }

  getReadArticle(){
    const idx = this.state.menus.findIndex(item=>item.id === this.state.selected_id);
    let data = this.state.menus[idx];
    console.log(data);
    return data;
  }


  getArticles(){
    let _article = null;
    if(this.state.mode === 'welcome'){
      let _data = this.state.welcome;
      _article = <Article data={_data} mode={this.state.mode}></Article>;
    } else if(this.state.mode === 'read'){

      let _data = this.getReadArticle();
      
      _article = <Article data={_data} onChangePage={(_mode)=>{
        this.setState({
          mode:_mode
        })
      }}></Article>; 
    } else if(this.state.mode === 'create'){
      _article = <CreateArticle onsubmit={(_title, _desc)=>{
        this.max_menu_id += 1;

        //배열을 추가해주기 > 직접 밀어넣는거 말고 변경하기(원본변경되는거)
        // this.state.menus.push(
        //   {id:this.max_menu_id, title:_title, desc:_desc}
        // );

        //복사본 만들기 concat (합쳐서 새로운 배열 만듬)
        // let _menus = this.state.menus.concat(
        //   {id:this.max_menu_id, title:_title, desc:_desc}
        // );

        //복사본 만들기 Array.from로 만들고, 그후에 값추가
        // let _menus = Array.from(this.state.menus);
        // _menus.push(
        //   {id:this.max_menu_id, title:_title, desc:_desc}
        // );
        
        //기본 배열 풀어헤치고(스프레드 연산자), 새로운값 추가 
        let _menus =[...this.state.menus, {id:this.max_menu_id, title:_title, desc:_desc}];



        //복사본을 넣기
        this.setState({
          menus:_menus
        });
        //console.log(_title, _desc); //제목 내용
      }}></CreateArticle>;
    } else if(this.state.mode === 'modify'){

      let _data = this.getReadArticle();

      _article = <UpdateArticle data={_data} onsubmit={(_title, _desc)=>{
        let _menus = [...this.state.menus];
        const idx = this.state.menus.findIndex(item=>item.id === this.state.selected_id);
        _menus[idx] = {id:this.state.selected_id, title:_title, desc:_desc} //해당 번째의 값 수정
        this.setState({
          menus:_menus,
          mode:'read'
        })
      }}></UpdateArticle>;
    } else if(this.state.mode === 'delete'){
      if(window.confirm('정말 삭제할까요?')){
        /*
        기존 메뉴를 복사해서 복사본 _menus를 생성하고
        삭제하고자 하는 번호번째 값을 제거
        제거된 메뉴를 menus에 할당
        selected_id 는 0 으로 변경
        mode는 welcome으로 변경
        */
        let _menus =[...this.state.menus];
        let id = this.state.menus.findIndex(item=>item.id === this.state.selected_id);
        _menus.splice(id,1)

        //console.log(_menus);
        this.setState({
          menus:_menus,
          mode:'welcome',
          selected_id: 0
        });
        alert('삭제했습니다.')
      }else{
        alert('취소했습니다.')
        this.setState({
          mode:'welcome',
          selected_id: 0
        });
      }
      
    }
    return _article;
  }

  render() {
    console.log('APP render');
      
    return (    
        <div className="App">
          <Myheader 
            title={this.state.subject.title} 
            desc={this.state.subject.desc}
            onChangePage={()=>{
              this.setState({
                mode:'welcome'
              })
            }}
          ></Myheader>
          {/* <header>
            <h1 className="logo" onClick={()=>{
              this.setState({
                mode:'welcome'
              })
            }}>{this.state.subject.title}</h1>
            <p>{this.state.subject.desc}</p>
          </header> */}
          <Nav 
            data={this.state.menus}
            onChangePage={(id)=>{
              this.setState({
                mode:'read',
                selected_id:id
              })
            }}
          ></Nav>
          {this.getArticles()}
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={()=>{
              this.setState({
                mode:'create'
              })
            }}>Create</Button>
          </div>
        </div>
    
    )
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>안녕</h1>
      </header>
    </div>
  );
}
*/
export default App;


