import { useState } from 'react';
import { PlayerType } from './types';

type OnChangeType = { type: 'NAME', value: string } | { type: 'AGE', value: number };

const Player = ({ player, onSaveUpdate, isInput = false }: { player: PlayerType, onSaveUpdate: (player: PlayerType) => void, isInput?: boolean }) => {
	const [name, setName] = useState<string>(player.name || '');
	const [age, setAge] = useState<number | null>(player.age);
	const [enableSaveBtn, setEnableSaveBtn] = useState<boolean>(false);
	const [error, setError] = useState<string>('');


	const onChange = ({ type, value }: OnChangeType) => {
	  if (type === 'AGE') {
			setAge(value);
	} else {
			setName(value);
	}
	  setEnableSaveBtn(validateInputs(type, value));
	};

	const validateInputs = (type: string, value: any): boolean => {
	  const res = (type === 'AGE') ? (value >= 15 && value <= 60) : /^[a-zA-Z0-9 ]{3,}$/.test(value);
	  setError(res ? '' : 'The name must be alphanumeric, and the age should be between 15 and 60.');
	  return res;
	}


	return (<div>
		<div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px', margin: '5px' }}>
			<input
				type='text'
				placeholder='Player Name'
				value={name}
				style={{ width: '100px' }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ type: 'NAME', value: e.target.value })}
			/>
			<input
				type='number'
				placeholder='age'
				min={15} max={60}
				value={age || ''}
				style={{ width: '50px' }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ type: 'AGE', value: Number(e.target.value) })}
			/>
			<button
				disabled={!enableSaveBtn}
				onClick={() => {
					onSaveUpdate({ ...player, name, age });
					if (isInput) {
						setAge(null);
						setName('');
					}
					setEnableSaveBtn(false);
				}}
			>
					{(player.name && player.age) ? 'Save' : 'Add'}
			</button>
		</div>

		{!!error &&
			<div className='error-wrap' style={{ display: 'flex', justifyContent: 'space-between', gap: '5px', margin: '5px' }}>
				{error}
			</div>}
	</div>)
};

export default Player;
