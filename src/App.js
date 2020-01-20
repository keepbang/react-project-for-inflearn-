import React, { Component } from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'read',
      selected_content_id:1,
      subject:{title:"WEB",sub:"React Web Test(state)!"},
      welcome:{title:"Welcome!",desc:"Hello, React!!!"},
      contents:[
        {id:1,title:'HTML',desc:'HTML is for information!'},
        {id:2,title:'CSS',desc:'CSS is for design!'},
        {id:3,title:'JavaScript',desc:'JavaScript is for interactive!'}
      ]
    }
    
  }

  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          
          return data;
        }
        i += 1;
      }
  }

  getContent(){
    var _title, _desc,_article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      console.log('read content');
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title,_desc){
        ++this.max_content_id;

        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id,
        title:_title,desc:_desc});

        this.setState({
          contents:newContents,
          mode:'read',
          selected_content_id:this.max_content_id
        })
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id,_title,_desc){
        var newContents = Array.from(this.state.contents);

        var i = 0;
        while(i < newContents.length){
          if(newContents[i].id === _id){
            newContents[i] = {id:_id,title:_title,desc:_desc};
            break;
          }
          i++;
        }

        this.setState({
          contents:newContents,
          mode:'read'
        })
      }.bind(this)}></UpdateContent>
    }else if(this.state.mode === 'delete'){

    }

    
    return _article;
  }

  render(){
    
    
    return (
      <div className="App">
          <Subject title={this.state.subject.title} sub={this.state.subject.sub}
              onChangePage={function(e){
                console.log("Subject onChangePage");
                this.setState({
                  mode:'welcome'
                })
                }.bind(this)
              }
          ></Subject>
          <TOC
            onChangePage={function(id){
              console.log("TOC onChangePage");
                this.setState({
                  mode:'read',
                selected_content_id:Number(id)});
              }.bind(this)
            }
            data={this.state.contents}
          ></TOC>
          <Control onChangeMode={function(_mode){
            if(_mode === 'delete'){
              if(window.confirm('really?')){
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while(i<_contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i,1);
                    break;
                  }
                  i++;
                }

                this.setState({
                  contents:_contents,
                  mode:'welcome'
                });

                alert('deleted!!');

              }
            }else{
              this.setState({
                mode:_mode
              })
            }
          }.bind(this)}></Control>
          {this.getContent()}
          
      </div>
    );
  }
}

export default App;
