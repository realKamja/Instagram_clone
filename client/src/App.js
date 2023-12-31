import Story from './components/story_component';
import get_random_profiles from './javascripts/get_random_profiles';
import {useState, useRef} from 'react';
import './style.scss';
import PostArr from './sugesstions/Suggesstions';
import './App.css';
function App() {
  return (
    <div className="App">
      <Header />
      <StoryArr/>
      <PostArr />
      <Navbar />
    </div>
  );
}

function Header(){
  return(
    <div className="header">
      <img src="assets/images/logo.jpg"/>
      <div>
        <img src="assets/images/like_off_icon.jpg"/>
        <img src="assets/images/direct_msg_icon.jpg"/>
      </div>
    </div> 
  )
}

/**
 * 스토리 묶음
 */
function StoryArr() {
  var [profiles]=useState(get_random_profiles(30));
  var [new_story_num]=useState(Math.random() * profiles.length + 1);

  /* 스토리 컨테이너 이동 */
  var [con_tran, con_move]=useState(0);
  var story_con_ref=useRef();
  function move_left(){
    if(con_tran!=0)
      con_move(con_tran+document.body.clientWidth);
  };
  function move_right(){
    if(con_tran>(document.body.clientWidth-story_con_ref.current.offsetWidth))
      con_move(con_tran-document.body.clientWidth);
  }
  var move = {
    transition: 'all ease-in-out 0.5s',
    transform: 'translate('+con_tran+'px)'
  }

  return(
    <div style = {{height: '111.333px', margin: '5px 0px 10px 0px'}}>
      <div className="story_container" ref={story_con_ref} style={move}>
        <Story img_path={"assets/images/default_image.jpg"} id={"내 스토리"} is_new={true}/>
        {
          profiles.map(function(i){
            return <Story img_path={i[1]} id={i[2]} is_new={i[0]<new_story_num ? true:false}/>
          })
        }
      </div>
      <div className="story_arrow">
        <img src="assets/images/ei_arrow-left.png" onClick={move_left}/>
        <img src="assets/images/ei_arrow-right.png" onClick={move_right}/>
      </div>
    </div>
  );
}

function Navbar() {
  var tmp={
    width: '50px',
    height: '50px',
    borderRadius: '70%'
  };

  return(
    <div className="nav_bar">
      <img src="assets/images/bottom_nav_home_off_icon.jpg"/>
      <img src="assets/images/bottom_nav_search_off_icon.jpg"/>
      <img src="assets/images/bottom_nav_upload_icon.jpg"/>
      <img src="assets/images/bottom_nav_reels_off_icon.jpg"/>
      <img src="assets/images/default_image.jpg" style={tmp}/>
    </div>
  );
}

export default App;