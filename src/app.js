import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notesCard.js'

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            notes: []
        }
        this.showSideBar = this.showSideBar.bind(this);
        this.addNote = this.addNote.bind(this);
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
        const newNotes = Array.from(this.state.notes);
        newNotes.push(note);
        this.setState({
            notes: newNotes
        });
        this.noteTitle.value = "";
        this.noteText.value = "";
        this.showSideBar(e);
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
                            <NoteCard note={note} key={`note-${i}`}/>
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