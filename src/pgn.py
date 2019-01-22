
import re

class PGN:

    HEADERS = [
        'Event', 'Site', 'Date', 'Round', 'White', 'Black', 'Result'
    ]

    CASTLE = '0-0'

    headerRegex = re.compile(r'^\[.*\]$')
    moveNumRegex = re.compile(r'\d+.')
    commentRegex = re.compile(r'\{.*?\}')

    def __init__(self):
        self.event = None
        self.site = None
        self.date = None
        self.round = None
        self.white = ''
        self.black = ''
        self.result = "*"
        self.movetext = {} # move number -> move, optional comment


    @staticmethod
    def from_file(filename):
        result = PGN()
        with open(filename) as f:
            for line in f.readlines():
                result._parse_line(line.strip())
        return result


    def save(self, filename):
        pass


    def append_move(self, move):
        pass


    def _parse_line(self, line):
        return self._parse_header(line) or self._parse_movetext(line)


    def _parse_header(self, header):
        if self._is_header(header):
            parts = header[1:-1].split(' ')
            headerName = parts[0]
            if headerName in self.HEADERS:
                headerValue = ' '.join(parts[1:])
                setattr(self, headerName.lower(), headerValue)
                return True
            else:
                raise ValueError(f'Invalid header name: {headerName}')
        return False


    def _parse_movetext(self, movetext):
        if movetext.strip() == '' or self._is_header(movetext):
            return False
        tokens = movetext.split(' ')
        for token in tokens[:-1]:
            if self.moveNumRegex.match(token):
                digits = token[:-1]
                self.movetext[int(digits)] = []
            else:
                current_move = max(self.movetext.keys())
                self.movetext[current_move].append(token)


    def _is_header(self, text):
        return self.headerRegex.match(text) is not None


    def __str__(self):
        return f'''
        [Event {self.event}]
        [Site {self.site}]
        [Date {self.date}]
        [Round {self.round}]
        [White {self.white}]
        [Black {self.black}]
        [Result {self.result}]
        {self.movetext} {self.result}'''