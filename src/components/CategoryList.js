import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTable, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import GlobalFilter from './GlobalFilter';
import Checkbox from './Checkbox';
import { HiTrash, HiOutlineCloudUpload } from 'react-icons/hi'
import Modal from './Modal';
import Button from './Button';
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../hooks/auth-hook';

function CategoryList(props) {
    const { categories } = props;
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { sendRequest, isLoading} = useHttpClient();
    const { token } = useAuth();

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };


    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async (e, data) => {
        e.preventDefault();
        setShowConfirmModal(false);

        try {
            const response = await data.forEach(element => {
                sendRequest(`http://localhost:3500/api/category/delete/${element.original._id}`,
                    'delete', null, {
                    "Authorization": "Bearer " + token
                });
                props.categoryDeleteHandle(element.original._id);
            });
            //toast.success(response.message)
        } catch (err) {
            console.log(err);
        }

    };

    let i = 1;
    const columns = useMemo(() => [
        {
            Header: 'ID',
            Footer: 'ID',
            accessor: (originalRow, rowIndex) => (
                <div>
                    {i++}
                </div>
            ),
        },
        {
            Header: "Category Name",
            Footer: "Category Name",
            accessor: "title",
        },
        {
            Header: "Content",
            Footer: "Content",
            accessor: "description",
            Cell: ({ row: { original } }) => (
                <p>
                    {original.description.substr(0, 70) + '...'}
                </p>
            ),
        },
        {
            Header: 'Action',
            Footer: 'Action',
            accessor: (originalRow, rowIndex) => (
                <div>
                    <Link className='text-xs underline text-blue-700' to={`/dashboard/category/${originalRow._id}`}>Edit</Link>
                </div>
            ),
            id: 'action',
        }

    ], []);

    const data = useMemo(() => categories, [categories]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        selectedFlatRows
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    },
        useGlobalFilter,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Footer: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        }
    );

    const { globalFilter, pageIndex, pageSize } = state;




    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner />}
            <Modal
                isOpen={showConfirmModal}
                onClose={cancelDeleteHandler}
                header="Are you sure?"
                footer={
                    <React.Fragment>
                        <div className='flex gap-2'>
                            <Button width="[50%]" bgColor="bg-blue-500" outlineColor="blue-600" bgColorHover="bg-blue-400" onClick={cancelDeleteHandler}>
                                Cancel
                            </Button>
                            <Button width="[50%]" bgColor="bg-red-500" onClick={(e) => confirmDeleteHandler(e, selectedFlatRows)}>
                                Delete
                            </Button>
                        </div>
                    </React.Fragment>
                }
            >
                <p>
                    Do you want to proceed and delete this items? Please note that it
                    can't be undone thereafter.
                </p>
            </Modal>
            <section className="bg-gray-50 w-[100%] dark:bg-gray-900 py-3 sm:py-5">
                <div className="relative p-3 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                    <div className="flex flex-col px-4 py-1 space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
                        <div className="flex items-center flex-1 space-x-4">
                            <h5 className='flex gap-2'>
                                <span className="text-gray-500 text-md font-semibold">All Categories:</span>
                                <span className="dark:text-white">{categories.length}</span>
                            </h5>
                            <h5 className='flex gap-2'>
                                <span className="text-gray-500">Total sales:</span>
                                <span className="dark:text-white">$88.4k</span>
                            </h5>
                        </div>
                        <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                            <Link to='/dashboard/addcategory' className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add new Category
                            </Link>
                        </div>
                    </div>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    <div className="mt-2 flex flex-col justify-center">
                        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                        {selectedFlatRows.length <= 0 ? <thead className="bg-gray-200">
                                            {headerGroups.map((headerGroup, i) => (
                                                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map((column, k) => (
                                                        <th key={k} {...column.getHeaderProps()}
                                                            className="px-2 py-4 text-left text-sm font-medium text-gray-900 uppercase rounded-sm tracking-wider"
                                                        >
                                                            {column.render("Header")}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead> :
                                            <thead>
                                                <tr>
                                                    <th><button onClick={showDeleteWarningHandler} className='focus:bg-slate-50 active:bg-slate-50 text-gray-600 p-1 m-2 rounded-md'><HiTrash className='h-8 w-8' /></button></th>
                                                    <th><button onClick={showDeleteWarningHandler} className='focus:bg-slate-50 active:bg-slate-50 text-gray-600 p-1 m-2 rounded-md'><HiOutlineCloudUpload className='h-8 w-8' /></button></th>
                                                </tr>
                                            </thead>
                                        }
                                        <tbody {...getTableBodyProps()}
                                            className="bg-white divide-y text-sm divide-gray-200">
                                            {page.map((row, i) => {
                                                prepareRow(row);
                                                return (
                                                    <tr key={i} {...row.getRowProps()} className=' even:bg-gray-100 odd:bg-white hover:bg-gray-50'>
                                                        {row.cells.map((cell, i) => {
                                                            return <td key={i} {...cell.getCellProps()} className="px-2 py-4 whitespace-nowrap">{cell.render("Cell")}</td>
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <tfoot className="bg-gray-200">
                                            {
                                                footerGroups.map((footerGroup, i) => (
                                                    <tr key={i} {...footerGroup.getFooterGroupProps()}>
                                                        {
                                                            footerGroup.headers.map((column, i) => (
                                                                <td key={i} {...column.getFooteProps} className="px-2 py-4 text-left text-sm font-medium text-gray-900 uppercase rounded-sm tracking-wider">
                                                                    {
                                                                        column.render('Footer')
                                                                    }
                                                                </td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tfoot>
                                    </table>
                                    <div className='flex justify-between py-5 items-center px-2 text-sm'>
                                        <span>
                                            Page{" "}
                                            <strong>{pageIndex + 1} of {pageOptions.length}</strong>{" "}
                                        </span>
                                        <span>
                                            <select className=' focus:outline-none active:outline-none focus:border-none active:border-none focus:ring-orange-600 active:ring-orange-600 rounded-md py-1' value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                                                {
                                                    [10, 25, 50].map(pageSize => (
                                                        <option key={pageSize} value={pageSize}>
                                                            Show {pageSize}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </span>
                                        <span>
                                            Go to page: {" "}
                                            <input
                                                type='number'
                                                defaultValue={pageIndex + 1}
                                                onChange={(e) => {
                                                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                                    gotoPage(pageNumber)
                                                }}
                                                className='w-20 p-1 rounded-md'
                                            />
                                        </span>
                                        <div>
                                            <button className='bg-orange-200 w-8 h-9 text-xs rounded-full border font-semibold' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                                {"<<"}
                                            </button>
                                            <button className='bg-orange-200 w-8 h-9 text-xs rounded-full border font-semibold' onClick={() => previousPage()} disabled={!canPreviousPage}>
                                                {"<"}
                                            </button>
                                            <button className='bg-orange-200 w-8 h-9 text-xs rounded-full border font-semibold' onClick={() => nextPage()} disabled={!canNextPage}>
                                                {">"}
                                            </button>
                                            <button className='bg-orange-200 w-8 h-9 text-xs rounded-full border font-semibold' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                                {">>"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default CategoryList