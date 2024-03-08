'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const Breadcrumbs= () => {
  const router = useSearchParams();
  const [previousRoute, setPreviousRoute] = useState(null);

  return (
    <></>
  )
}
