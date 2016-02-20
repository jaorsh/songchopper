import pydub


banks = {"a": [],
"as": [],
"b": [],
"c": [],
"cs": [],
"d": [],
"ds": [],
"e": [],
"f": [],
"fs": [],
"g": [],
"gs": []
}


def get_audio():
	return ''


def get_slices(audio):
	return []


def get_pitch_from_slice():
	return 'as'


def main():
	audio = get_audio()
	slices = get_slices(audio)

	for slice in slices:
		pitch = get_pitch_from_slice(slice)
		banks[pitch].append(pitch)

	print banks


if __name__ == '__main__':
	main()