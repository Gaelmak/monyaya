import { useState } from 'react';

export default function UseLoading() : [boolean, () => void, () => void] {
  const [isLoading, setLoading] = useState<boolean>(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };
  

  return [isLoading, startLoading, stopLoading];
}

