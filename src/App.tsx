import React, { useState, useEffect } from 'react';

const App = () => {

  const [news, setNews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('react');
  const [url, setUrl] = useState<string>(`http://hn.algolia.com/api/v1/search?query=react`);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const newsResult: Response = await fetch(url);
      const jsonResult: any = await newsResult.json();
      setNews(jsonResult.hits);
    }
    catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value) };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  return (
    <div>
      <h1>News:</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={searchQuery} onChange={search}></input>
        <button>Search</button>
      </form>
      {
        loading ?
          'Loading' :
          news.map((n, index) => (<p key={index}>{n.title}</p>))
      }
    </div>
  );

}


//same code as below with useState hook
// const App = () => {

//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1)
//   }

//   // runs on state change
//   useEffect(() => {
//     document.title = `Count: ${count}`;
//   });

//   return <div className='App'>
//     <h1>Counter</h1>
//     <button onClick={increment}>Clicked {count} times</button>
//   </div>

// }

// type MyState = {
//   count: number
// };

// type MyProps = object;

// class App extends React.Component<MyProps, MyState> {

//   constructor(props: MyProps) {

//     super(props);
//     this.state = {
//       count: 0,
//     };

//     this.increment = this.increment.bind(this);

//   };

//   componentDidMount(): void {
//     document.title = `Initial count: ${this.state.count}`;
//   }

//   componentDidUpdate(): void {
//     document.title = `Clicked ${this.state.count} times`;
//   }

//   increment() {
//     const count: number = this.state.count + 1;
//     this.setState({ count });
//   };

//   render() {
//     return <div className='App'>
//       <h1>Increment app</h1>
//       <button onClick={this.increment}>Clicked {this.state.count} times</button>
//     </div>
//   };
// }

export default App;
