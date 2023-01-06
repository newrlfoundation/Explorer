import moment from 'moment'
import Link from 'next/link'
import React from 'react'

type PageProps = {
    params: {
        blockId: number
    }
}

async function getBlockDetials(blockId: number) {
    const res = await fetch(`https://mainnetgw.newrl.net/get-archived-blocks?start_index=${blockId}&end_index=${blockId}`, { cache: "force-cache" });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

async function page({ params: { blockId } }: PageProps) {
    const data = await getBlockDetials(blockId)
    const block = data['blocks'][0]
    const hash = data['hashes']
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
                        <Link href={"/block"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            Blocks
                        </Link>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"># {blockId}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className='p-5 my-10 bg-white rounded-md'>
                <div className='flex justify-between'>
                    <h1>Block Details</h1>
                </div>
                <hr />
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 pt-10'>
                    <div>
                        Index : <strong>{block.index}</strong>
                    </div>
                    <div>
                        Timestamp: {moment(block.timestamp).calendar()} <span className='ml-2 text-xs'>{moment(block.timestamp).fromNow()}</span>
                    </div>
                    <div className='truncate'>
                        Hash : {hash}
                    </div>
                    <div>
                        Proof : {block.proof}
                    </div>
                    <div>
                        Status : {block.status}
                    </div>
                    <div className='truncate'>
                        Creator Wallet : {block.creator_wallet}
                    </div>
                    <div className='truncate'>
                        Expected Miner : {block.expected_miner}
                    </div>
                    <div className="md:col-span-2 md:py-5">
                        Committee List <span className='text-xs align-super'>[ {block.committee ? block.committee.length : 0} ]</span>
                        <div className='flex justify-center items-center'>
                            <textarea id="message" rows={4} readOnly className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="committee list..." value={block.committee && block.committee.map((id: number, index: number) => (
                                `${id}\t`
                            ))}>
                            </textarea>
                        </div>
                    </div>
                    <div className='md:col-span-2'>
                        Transactions <span className='text-xs align-super'>[ {block.text.transactions ? block.text.transactions.length : 0} ]</span>
                        <div className='flex flex-col justify-center items-center bg-zinc-300-400 text-neutral-700'>
                            {
                                block.text.transactions && block.text.transactions.map((trans: any, index: number) => (
                                    <>
                                        <div className='p-5'>
                                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 bg-slate-100 p-2 rounded-t-md' key={index}>
                                                <div>
                                                    Timestamp : {moment(trans.transaction.timestamp).calendar()} <span className='ml-2 text-xs'>{moment(trans.transaction.timestamp).fromNow()}</span>
                                                </div>
                                                <div className='truncate'>
                                                    Trans code : <Link href={`/transaction/${trans.transaction.trans_code}`} className="text-blue-600 underline">{trans.transaction.trans_code}</Link>
                                                </div>
                                                <div>
                                                    Type : {trans.transaction.type}
                                                </div>
                                                <div>
                                                    Currency : {trans.transaction.currency}
                                                </div>
                                                <div className='md:col-span-2'>
                                                    Fee : {trans.transaction.fee}
                                                </div>
                                                {trans.transaction.type === 5 &&
                                                    <>
                                                        <div className='truncate'>
                                                            From Wallet : <strong>{trans.transaction.specific_data.wallet1}</strong>
                                                            <div className="flex flex-row text-sm text-purple-900 font-extrabold">
                                                                <p className="mr-3">{trans.transaction.specific_data.asset1_code} - {Number(trans.transaction.specific_data.asset1_number) / 1000000}</p>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" data-tooltip-target="tooltip-right" data-tooltip-placement="right">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                                                </svg>

                                                                <div id="tooltip-right" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                                    {trans.transaction.specific_data.asset1_number}
                                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='truncate'>
                                                            To Wallet : <strong>{trans.transaction.specific_data.wallet2}</strong>
                                                        </div>

                                                    </>
                                                }
                                                {trans.transaction.type !== 5 &&
                                                    <>
                                                        <div className='md:col-span-2'>
                                                            Description : {trans.transaction.descr}
                                                        </div>
                                                        <div className='truncate'>
                                                            Wallet Address : <strong>{trans.transaction.specific_data.wallet_address}</strong>
                                                        </div>
                                                        <div>
                                                            Network Address : <strong>{trans.transaction.specific_data.network_address}</strong>
                                                        </div>
                                                        <div>
                                                            Broadcast Timestamp : {moment(trans.transaction.specific_data.broadcast_timestamp).calendar()} <span className='ml-2 text-xs'>{moment(trans.transaction.specific_data.broadcast_timestamp).fromNow()}</span>
                                                        </div>
                                                        <div>
                                                            Software Version : {trans.transaction.specific_data.software_version}
                                                        </div>
                                                        <div>
                                                            Last Block Index : <Link href={`/block/${trans.transaction.specific_data.last_block_index}`} className="text-blue-600 underline">{trans.transaction.specific_data.last_block_index}</Link>
                                                        </div>
                                                    </>
                                                }
                                                <div>
                                                    Is child Txn : {trans.transaction.is_child_txn.toString()}
                                                </div>
                                            </div>

                                            <div className='bg-zinc-200 rounded-b-md p-2 grid grid-cols-1'>
                                                Signatures
                                                <div className='pt-2 px-3'>
                                                    <div className='truncate'>
                                                        wallet_address :  {trans.signatures[0].wallet_address}
                                                    </div>
                                                    <div className='truncate'>
                                                        MSG sign :  {trans.signatures[0].msgsign}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page