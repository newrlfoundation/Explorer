import Link from 'next/link'
import moment from "moment"
import React from 'react'

async function getLastIndex() {
    const res = await fetch('https://mainnetgw.newrl.net/get-last-block-index', { next: { revalidate: 10 } });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

async function getFullBlocks(blockValue: number) {
    const res = await fetch(`https://mainnetgw.newrl.net/get-archived-blocks?start_index=${blockValue - 25}&end_index=${blockValue}`, { next: { revalidate: 10 } });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

function extractTransaction(blocks: any) {
    let _transactions = [];
    for (let block of blocks) {
        const transaction_signs = block.text.transactions;

        for (const tx_sign of transaction_signs) {
            const tx = tx_sign.transaction;
            const sign = tx_sign.signatures[0]

            _transactions.push({
                timestamp: tx.timestamp,
                transactionCode: tx.trans_code,
                type: tx.type,
                signer: sign.wallet_address,
                fee: `${parseInt(tx.fee)} ${tx.currency}`,
            })
        }
    }

    return _transactions
}

async function page() {
    const lastBlock = await getLastIndex();
    let { blocks } = await getFullBlocks(lastBlock);
    blocks = blocks.reverse();
    const transactions = extractTransaction(blocks);

    return (
        <>
            <div className='p-10'>
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href={"/"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                Transactions
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            {/* All Transactions */}
            <div className="bg-white p-5 mx-10 md:px-10 rounded-md h-full overflow-y-auto">
                <p className="text-center font-semibold p-5">Latest Transactions</p>
                {
                    transactions.map((txn: any, index: number) => (
                        <Link key={index} href={`/transactions/${txn.transactionCode}`}>
                            <div key={index} className="flex py-3 space-x-3 cursor-pointer border-indigo-500 hover:border-r-2">
                                <div>
                                    <p className="bg-rose-100 w-10 h-10 rounded-md flex items-center justify-center">
                                        TXN
                                    </p>
                                </div>
                                <div className="truncate">
                                    <p className="font-semibold truncate">{txn.transactionCode}</p>
                                    <p className="text-xs">{moment(txn.timestamp).calendar()}</p>
                                </div>
                                <div className="flex-grow truncate">
                                    <span className="text-xs">signer</span>: {txn.signer}
                                </div>
                                <div className="w-20 text-center">
                                    <p className="font-semibold text-xs"> <span className="text-xs font-normal">fee</span> {txn.fee}</p>
                                    <p className="text-xs">Type : {txn.type}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default page