import React from 'react';
import { useRouter } from 'next/router';

import { BoardManager } from '../../../components/BoardManager';

export default function() {
    const router = useRouter();
    const { board = null } = router.query;
    console.log(router.query);

    return (
        <BoardManager boardName={String(board)} />
    )
}