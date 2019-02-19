
import re

class PGN:

    HEADERS = [
        'Event', 'Site', 'Date', 'Round', 'White', 'Black', 'Result'
    ]
    IN_PROGRESS = "*"

    token_specification = [
        ('MOVE_NUM', r'\d+\.'),
        ('SAN', r'(?:[PNBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:\=[PNBRQK])?|O(-?O){1,2})[\+#]?'),
        ('COMMENT', r'\{.*?\}'),
    ]
    
    headerRegex = re.compile(r'^\[.*\]$')
    token_regex = '|'.join('(?P<%s>%s)' % pair for pair in token_specification)

    def __init__(self):
        self.event = None
        self.site = None
        self.date = None
        self.round = None
        self.white = None
        self.black = None
        self.result = self.IN_PROGRESS
        self.movetext = {} # move number -> pair of moves, optional comment

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


    def _parse_movetext(self, line):
        if line.strip() == '' or self._is_header(line):
            return False
        for token in re.finditer(self.token_regex, line):
            kind = token.lastgroup
            # print(kind)
            value = token.group()
            if kind == 'MOVE_NUM':
                digits = value[:-1]
                self.movetext[int(digits)] = []
            elif kind == 'SAN':
                current_move = max(self.movetext.keys())
                self.movetext[current_move].append(value)
            # elif kind == 'COMMENT':
            #     return True
        return True


    def _is_header(self, text):
        return self.headerRegex.match(text) is not None


    def _write_result_text(self):
        if self.result == self.IN_PROGRESS:
            return None
        return self.result[1:-1]


    # TODO: maintain line width - round trip?
    def _write_movetext(self):
        result = []
        for key in self.movetext.keys():
            result.append(str(key) + '.')
            result.extend(self.movetext[key])
        return ' '.join(result)


    def __str__(self):
        return \
f'''[Event {self.event}]
[Site {self.site}]
[Date {self.date}]
[Round {self.round}]
[White {self.white}]
[Black {self.black}]
[Result {self.result}]
{self._write_movetext()} {self._write_result_text()}'''