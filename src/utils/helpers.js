export default function bgColorState(state) {
    switch (state) {
        case 'PUBLISHED':
            return <span className='bg-green-400 p-1 rounded-lg text-gray-700'>{state}</span>
            break;

        case 'ARCHIVED':
            return <span className='bg-red-400 p-1 rounded-lg text-gray-700'>{state}</span>
            break;

        case 'IN_WRITING':
            return <span className='bg-gray-400 p-1 rounded-lg text-gray-700'>{state}</span>
            break;

        case 'WAITING_VALIDATION':
            return <span className='bg-orange-400 p-1 rounded-lg text-gray-700'>{state}</span>
            break;
        default:
            break;
    }
}