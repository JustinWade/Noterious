import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notesCard.js'

const firebaseConfig = {
    apiKey: "AIzaSyAvNIJu0_c0r2RuRm0QlrWqDn6NeQgRXx4",
    authDomain: "notetorious-30912.firebaseapp.com",
    databaseURL: "https://notetorious-30912.firebaseio.com",
    projectId: "notetorious-30912",
    storageBucket: "notetorious-30912.appspot.com",
    messagingSenderId: "517600560139",
    appId: "1:517600560139:web:46193bd618dd4c2936330e",
    measurementId: "G-9DERZXEMX1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();


class App extends React.Component {
    constructor(){
        super();
        this.state = {
            notes: []
        }
        this.showSideBar = this.showSideBar.bind(this);
        this.addNote = this.addNote.bind(this);
    }
    
    componentDidMount(){
        firebase.database().ref().on('value', (res) => {
            const userData = res.val();
            const dataArray = [];
            for(let objKey in res.val()){
                userData[objKey].key = objKey;
                dataArray.push(userData[objKey])
            }
            this.setState({
                notes: dataArray
            })

        });
    }
    showSideBar(e){
        e.preventDefault();
        this.sidebar.classList.toggle("show");
    }
    
    addNote(e){
        e.preventDefault();
        const note = {
            title: this.noteTitle.value,
            text: this.noteText.value
        };
        
        const dbRef = firebase.database().ref();
        dbRef.push(note);

        this.noteTitle.value = "";
        this.noteText.value = "";
        this.showSideBar(e);
    }

    removeNote(noteID){
        const dbRef = firebase.database().ref(noteID);
        dbRef.remove();
    }

    render(){
        return(
            <div>
                <header className="mainHeader">
                    <h1>📝Noterious </h1>
                    <nav>
                        <a href="" onClick={this.showSideBar}>Add New Note</a>
                    </nav>
                </header>
                <section className="notes">
                    {this.state.notes.map((note, i) => {
                        return (
                            <NoteCard note={note} key={`note-${i}`} removeNote={this.removeNote}/>
                        )
                    }).reverse()}
                </section>
                <aside className="sidebar" ref={ref => this.sidebar = ref}>
                    <form onSubmit={this.addNote}>
                        <h3>Add New Note</h3>
                        <div className="close-btn" onClick={this.showSideBar}>
                            <i className="fa fa-times"></i>
                        </div>
                        <label htmlFor="note-title">Title</label>
                        <input type="text" name="note-title" ref={ref => this.noteTitle = ref}/>
                        <label htmlFor="note-text">Text:</label>
                        <textarea name="note-text" ref={ref => this.noteText = ref}></textarea>
                        <input type="submit" value="Add New Note"></input>
                    </form>
                </aside>
            </div>
        )
    }
}

ReactDom.render(<App/>,document.getElementById('app'));