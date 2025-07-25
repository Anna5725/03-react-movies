import css from "./SearchBar.module.css";
import toast from 'react-hot-toast';
interface SearchBarProps { 
    onSubmit :(title:string)=> void;}

export default function SearchBar ({onSubmit} : SearchBarProps){
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const formData = new FormData (event.currentTarget);
        const title = formData.get("query") as string;
    if (!title.trim()){
        toast("Please enter your search query.", {
        duration: 2000,
        position: 'top-center',
      });
      return;
    }
    onSubmit(title);
    event.currentTarget.reset();
}
    return(<header className={css.header}>
        <div className={css.container}>
        <a
        className={css.link}
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
        >
        Powered by TMDB
        </a>
        <form onSubmit={handleSubmit} className={css.form}>
        <input
        className={css.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
        />
        <button className={css.button} type="submit">
        Search
        </button>
        </form>
        </div>
        </header> 
    )
}