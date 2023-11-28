import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const COUNTRIES = ['France', 'Allemagne', 'Angleterre', 'Cameroun', 'Senegal', 'Canada']

const suggestions = COUNTRIES.map(country => {
    return {
      id: country,
      text: country
    };
  });
  
  const KeyCodes = {
    comma: 188,
    enter: 13
  };
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

function MultiTags(props) {
    const {tags, setTags} = props;

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };


    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (
        <div className="my-4">
            <h1 className='text-gray-900 font-semibold txt-sm'> Tags </h1>
            <div className='w-full'>
                <ReactTags
                    classNames={{
                        tagInputField: 'p-2 mb-1 border w-full border-gray-300 rounded-md placeholder:font-alata placeholder:text-md focus:outline-none active:outline-none focus:ring-orange-600 focus:border-none',
                        tags: 'gap-2',
                        selected: ' flex gap-2 rounded-full',
                        tag: 'bg-orange-600 text-white rounded-md p-2 text-sm font-semibold'
                    }}
                    tags={tags}
                    suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="top"
                    autocomplete
                />
            </div>
        </div>
    );

}

export default MultiTags