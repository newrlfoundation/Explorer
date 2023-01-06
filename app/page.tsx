import React from "react";
import moment from "moment"
import Link from "next/link";
import SearchButton from "../components/searchButton";

async function getLastIndex() {
  const res = await fetch('https://mainnetgw.newrl.net/get-last-block-index', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getFullBlocks(blockValue: number) {
  const res = await fetch(`https://mainnetgw.newrl.net/get-archived-blocks?start_index=${blockValue - 25}&end_index=${blockValue}`, { cache: 'no-store' });
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

async function main() {
  const lastBlock = await getLastIndex();
  let { blocks } = await getFullBlocks(lastBlock);
  blocks = blocks.reverse();
  const transactions = extractTransaction(blocks);
  return (
    <>
      {/* Heading */}
      <div className="p-5 mx-5 text-center bg-fixed">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">The <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent background-animate">NEWRL Blockchain </span> Explorer.</h1>
        <SearchButton />
      </div>

      {/* Stats */}
      <div className="bg-white py-2 mx-10 rounded-md grid grid-cols-2  md:grid-cols-4 gap-4 text-center divide-x-0 md:divide-x-2 divide-slate-200">
        <div className="max-w-lg text-sm leading-normal text-gray-900 dark:text-white">
          <p className="uppercase flex justify-center">Fee <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
          </svg>
          </p>
          <p className='text-xl font-semibold'>0 <span className="text-xs">NWRL</span></p>
        </div>
        <div className="max-w-lg text-sm leading-normal text-gray-900 dark:text-white cursor-pointer">
          <Link href={"/block"}>
            <p className="uppercase flex justify-center">Blocks <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>
            </p>
            <p className='text-xl font-semibold'>{lastBlock}</p>
          </Link>
        </div>
        <div className="max-w-lg text-sm leading-normal text-gray-900 dark:text-white">
          <p className="uppercase flex justify-center">Version <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
          </svg>
          </p>
          <p className='text-xl font-semibold'>1.4.2</p>
        </div>
        <div className="max-w-lg text-sm leading-normal text-gray-900 dark:text-white">
          <p className="uppercase flex justify-center">Nodes <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          </p>
          <p className='text-xl font-semibold flex justify-center'>400 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="m-10 rounded-md grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* blocks */}
        <div className="bg-white py-5 px-5 md:px-10 rounded-md h-96 overflow-y-auto">
          <p className="text-center font-semibold">Latest Blocks</p>
          {
            blocks.map((block: any, index: number) => (
              <Link key={index} href={`/block/${block.index}`}>
                <div key={index} className="flex py-3 space-x-3 cursor-pointer border-indigo-500 hover:border-r-2">
                  <div>
                    <p className="bg-rose-100 w-10 h-10 rounded-md flex items-center justify-center">
                      BK
                    </p>
                  </div>
                  <div className="w-36">
                    <p className="font-semibold">{block.index}</p>
                    <p className="text-xs">{moment(block.timestamp).calendar()}</p>
                  </div>
                  <div className="flex-grow truncate">
                    <span className="text-xs">Validator</span>: {block.creator_wallet}
                  </div>
                  <div className="w-20 text-center">
                    <p className="font-semibold"> <span className="text-xs font-normal">Total</span> {block.text.transactions.length} <span className="text-xs font-normal">txn</span></p>
                    <p className="text-xs">{`${(JSON.stringify(block).length / 1024).toFixed(2)} kb`}</p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
        {/* Transactions */}
        <div className="bg-white py-5 px-5 md:px-10 rounded-md h-96 overflow-y-auto">
          <p className="text-center font-semibold">Latest Transactions</p>
          {
            transactions.map((txn: any, index: number) => (
              <Link key={index} href={`/transaction/${txn.transactionCode}`}>
                <div key={index} className="flex py-3 space-x-3 cursor-pointer border-indigo-500 hover:border-r-2">
                  <div>
                    <p className="bg-rose-100 w-10 h-10 rounded-md flex items-center justify-center">
                      TXN
                    </p>
                  </div>
                  <div className="w-36 overflow-hidden">
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
      </div>
    </>
  )
}

export default main;
