import React, { memo, useState } from 'react';
import { Button } from 'react-bootstrap';

type SearchProps = {
  getGithubissues: (url: string) => void;
};

const Search = ({ getGithubissues }: SearchProps) => {
  const [url, setUrl] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleLoadIsseus = () => {
    getGithubissues(url);
  };

  return (
    <div className="d-flex justify-content-between align-items-center gap-3">
      <div className="input-group">
        <input
          type="text"
          placeholder="Repo Url"
          aria-label="repo"
          aria-describedby="basic-addon1"
          value={url}
          className="form-control"
          onChange={(e) => onChange(e)}
        />
      </div>

      <Button className="load-btn" onClick={handleLoadIsseus}>
        Load Issues
      </Button>
    </div>
  );
};

export default memo(Search);
