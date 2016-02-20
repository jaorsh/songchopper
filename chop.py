from pydub import AudioSegment
import subprocess
import re


SLICE_DURATION = 200
REGEX_PATTERN = '([0-9]+)\.0+\t'
NOTES = ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b']
TMP_PATH = '.tmp/tmp.mp3'


def get_slices(audio, slice_duration):
	slices = []
	start_of_next_slice = 0
	while start_of_next_slice < len(audio):
		audio_slice = audio[start_of_next_slice:start_of_next_slice + slice_duration]
		slices.append(audio_slice)
		start_of_next_slice += slice_duration

	return slices


def get_pitch_from_slice(audio_slice):
	audio_slice.export(TMP_PATH, format='mp3')
	output = subprocess.check_output(['aubionotes', TMP_PATH])
	matches = re.search(REGEX_PATTERN, output)
	if matches:
		midi_note_number = int(matches.group(1))
		modded_note_number = midi_note_number % 12
		return NOTES[modded_note_number]


def main():
	audio = AudioSegment.from_file('input/kanye.mp3', format='mp3')
	slices = get_slices(audio, SLICE_DURATION)

	for audio_slice in slices:
		pitch = get_pitch_from_slice(audio_slice)
		if pitch:
			file_name = str(hash(audio_slice))
			audio_slice.export('output/%s/%s.mp3' % (pitch, file_name), format='mp3')


if __name__ == '__main__':
	main()