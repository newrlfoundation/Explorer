import moment from 'moment'
import Link from 'next/link'
import React from 'react'

type PageProps = {
    params: {
        txnHash: string
    }
}

async function getTXNDetials(txnHash: string) {
    const res = await fetch(`https://mainnetgw.newrl.net/get-transaction?transaction_code=${txnHash}`, { cache: "force-cache" });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

async function getBlock(blockValue: number) {
    const res = await fetch(`https://mainnetgw.newrl.net/get-archived-blocks?start_index=${blockValue}&end_index=${blockValue}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

function extractTransaction(blocks: any, txnHash: string) {
    let _transactions = {};
    for (let block of blocks) {
        const transaction_signs = block.text.transactions;

        for (const tx_sign of transaction_signs) {
            if (tx_sign.transaction.trans_code === txnHash) {
                _transactions = { ...tx_sign.transaction, "signatures": tx_sign.signatures }
            }
        }
    }

    return _transactions
}

async function page({ params: { txnHash } }: PageProps) {
    debugger
    const txndata = await getTXNDetials(txnHash)
    const data = await getBlock(txndata.block_index)
    const transaction: any = extractTransaction(data.blocks, txnHash);

    return (
        <div className='p-10'>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link href={"/"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link href={"/transaction"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            Transactions
                        </Link>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"># {txnHash}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className='p-5 my-10 bg-white rounded-md'>
                <div className='flex justify-between'>
                    <h1>Transaction Details</h1>
                </div>
                <hr />
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 pt-10'>
                    <div>
                        Block Index : <Link href={`/block/${txndata.block_index}`} className="text-blue-600 underline">{txndata.block_index}</Link>
                    </div>
                    <div>
                        Timestamp: {moment(transaction.timestamp).calendar()} <span className='ml-2 text-xs'>{moment(transaction.timestamp).fromNow()}</span>
                    </div>
                    <div>
                        Type : {transaction.type}
                    </div>
                    <div>
                        Currency : {transaction.currency}
                    </div>
                    <div>
                        Fee : {transaction.fee}
                    </div>
                    <div className='md:col-span-2'>
                        Description : {transaction.descr}
                    </div>
                    <div className='truncate'>
                        Wallet Address : <strong>{transaction.specific_data.wallet_address}</strong>
                    </div>
                    <div>
                        Network Address : <strong>{transaction.specific_data.network_address}</strong>
                    </div>
                    <div>
                        Broadcast Timestamp : {moment(transaction.specific_data.broadcast_timestamp).calendar()} <span className='ml-2 text-xs'>{moment(transaction.specific_data.broadcast_timestamp).fromNow()}</span>
                    </div>
                    <div>
                        Software Version : {transaction.specific_data.software_version}
                    </div>
                    <div>
                        Last Block Index : <Link href={`/block/${transaction.specific_data.last_block_index}`} className="text-blue-600 underline">{transaction.specific_data.last_block_index}</Link>
                    </div>
                    <div>
                        Is child Txn : {transaction.is_child_txn.toString()}
                    </div>
                    <div className='md:col-span-2'>
                        <div className='bg-zinc-200 rounded-b-md p-2 grid grid-cols-1'>
                            Signatures
                            <div className='pt-2 px-3'>
                                <div className='truncate'>
                                    wallet_address :  {transaction.signatures[0].wallet_address}
                                </div>
                                <div className='truncate'>
                                    MSG sign :  {transaction.signatures[0].msgsign}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page