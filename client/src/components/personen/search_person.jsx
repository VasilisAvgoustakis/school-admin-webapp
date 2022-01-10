const SearchPerson = () => {

    function onclick(){
        console.log(document.getElementsByTagName('116'));
    }

    return(
        <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Personen Suche"
                name="s" 
            />
            <button type="submit">Suchen</button>
        </form>
)}

export default SearchPerson;