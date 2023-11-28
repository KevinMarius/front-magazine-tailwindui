import React from 'react'
import { HiThumbDown, HiThumbUp, HiTrash, HiPencilAlt } from 'react-icons/hi';
import Button from './Button';

function PostItem(props) {
    const { item } = props;
    return (
        <React.Fragment>
            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="w-4 px-4 py-3">
                    <div className="flex items-center">
                        #{item.id}
                    </div>
                </td>
                <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png" alt="iMac Front Image" className="w-auto h-8 mr-3" />
                    {item.customer_name}&#34;
                </th>
                <td className="px-4 py-2">
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">{item.shipment_address}</span>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                        <HiThumbDown className="inline-block w-4 h-4 mr-2 text-red-600 rounded-sm" />
                    </div>
                </td>
                <td className="px-4 py-3 flex gap-1 flex-col md:flex-row items-center justify-end">
                    <Button onClick={props.handleEditClick} bgColor="bg-blue-700" bgColorHover="bg-blue-700" className='me-1'><HiPencilAlt className='w-4 h-4' /></Button>
                    <Button onClick={props.showDeleteWarningHandler} bgColor="bg-red-700" bgColorHover="bg-red-700"><HiTrash className='w-4 h-4' /></Button>
                </td>
            </tr>
        </React.Fragment>
    )
}

export default PostItem