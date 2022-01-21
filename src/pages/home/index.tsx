import { useEffect, useState } from 'react';
import api from '/src/utils/api';

import css from './home.module.css';

const basePosterUrl = 'https://image.tmdb.org/t/p/w500';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [inputValue])


  useEffect(() => {
    if (isTyping === false && inputValue) {
      setQuery(inputValue)
    }
  }, [isTyping])

  const [data, setData] = useState({
    results: []
  } as any);

  useEffect(() => {
    if (query.length) {
      api.get(`/search/movie`, { query })
        .then((response) => {
          setData(response);
        })
    }
  }, [query]);

  const handleForm = (ev) => {
    ev.preventDefault();
  }

  const handleInput = (ev) => {
    setInputValue(ev.target.value);
  }

  const handleLoadMore = () => {
    api.get(`/search/movie`, {
      query,
      page: data.page + 1
    })
      .then((response) => {
        setData(prev => ({
          ...response,
          results: prev.results.concat(response.results)
        }));
      })
  }

  return (
    <article>
      <h2 data-testid="page-title">Movie search</h2>
      <form method="post" onSubmit={handleForm}>
        <input name="query" type="search" onInput={handleInput} />
      </form>
      {data && (
        <>
          <div className={css.grid} data-testid="movie-results">
            {data.results.map(movie => (
              <div
                key={movie.id}
              >
                {movie.poster_path ? (
                  <img src={`${basePosterUrl}${movie.poster_path}`} alt={movie.original_title} />
                ) : (
                  <p>No image.</p>
                )}
                {movie.original_title}
              </div>
            ))}
          </div>
          {data.results.length < data.total_results && (
            <button onClick={handleLoadMore}>Load more movies</button>
          )}
        </>
      )}
    </article>
  )
}

export default HomePage